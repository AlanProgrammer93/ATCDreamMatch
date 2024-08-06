"use client";

import useClickOutside from '@/utils/clickOutside';
import React, { useRef, useState } from 'react'
import './style.css'
import { Member, useTeamStore } from '@/store/teams';

interface ModalProps {
  setShowModal: (value: boolean) => void;
}

const Modal = ({ setShowModal }: ModalProps) => {
  const teams = useTeamStore((state) => state.teams);
  const popup = useRef(null);
  useClickOutside(popup, () => setShowModal(false));

  const [name, setName] = useState('')
  const [members, setMembers] = useState<Member[]>([]);
  const [resultSearch, setResultSearch] = useState([])

  const players = useTeamStore((state) => state.players);
  const addMember = useTeamStore((state) => state.addMember);
  const addTeam = useTeamStore((state) => state.addTeam);

  const handleAddTeam = () => {
    if (teams.length === 2) {
      alert("Solo puedes crear 2 equipos.")
      return
    }

    if (!name) {
      alert("Debes poner un nombre al equipo.")
      return
    }

    const newTeam = { name: name, members: members };
    addTeam(newTeam);
    members.map(member => addMember(member.id))
    setShowModal(false)
  };

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearch = (search: string) => {
    if (search.length < 3) {
      setResultSearch([]);
      return
    }

    if (search === "") {
      setResultSearch([]);
    } else {
      if (debounceRef.current)
        clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(async () => {
        try {
          const response = await fetch(`https://apiv3.apifootball.com/?action=get_players&player_name=${search}&APIkey=69a2653735269481d6536aae845b37ae6e63084c8f3d8e0aa154ab37f95b6069`);
          const data = await response.json();

          setResultSearch(data.slice(0, 10));
        } catch (err) {
          console.log(err);
        }
      }, 500)
    }
  }

  const handleAddPlayer = (player: any) => {
    if (members.length === 5) {
      alert("Solo se puede seleccionar 5 jugadores.")
      return
    }
    const existMemberSelected = members.find(selected => selected.id == player.player_id)
    if (existMemberSelected) {
      alert("No se puede agregar el mismo jugador.")
      return
    }
    const existMember = players.find(id => id == player.player_id)
    if (existMember) {
      alert("No se puede agregar el mismo jugador en los 2 equipos.")
      return
    }
    setMembers([...members, { id: player.player_id, name: player.player_name, image: player.player_image }])
  }

  const handleDeleteMember = (id: string) => {
    setMembers(
      members.filter(a =>
        a.id !== id
      )
    );
  }

  return (
    <div className='blurModal'>
      <div className='modalContainer bg-gray-100 w-[80%] lg:w-[50%]' ref={popup}>
        <div className='flex flex-col items-center py-4 px-10'>
          <h2 className='text-2xl mb-2 text-center'>Arma Tu Equipo</h2>
          <input className='w-full p-2 outline-none mb-2' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nombre del Equipo' />
          <input className='w-full p-2 outline-none mb-2' onChange={(e) => handleSearch(e.target.value)} placeholder='Buscar Jugador' />

          {
            resultSearch.length > 0 && (
              <div className="z-40 rounded-lg bg-white w-full p-2 max-h-[200px] scrollbar overflow-y-auto">
                {
                  resultSearch.map((player: any) => (
                    <div onClick={() => handleAddPlayer(player)} key={player.player_id} className="border-gray-300 bg-gray-300 flex items-center gap-3 px-3 py-1 mb-1 cursor-pointer">
                      <img className=' w-[30px] h-[30px]' src={player.player_image} alt='' />
                      <h2 className="text-small">{player.player_name}</h2>
                    </div>
                  ))
                }
              </div>
            )
          }
          <div className='absolute bottom-0 right-0 left-0 flex flex-col items-center justify-center px-10'>

            {
              members.length > 0 && (
                <div className="rounded-lg bg-white w-full flex items-center justify-center gap-3 p-2 my-4 scrollbar overflow-x-auto">
                  {
                    members.map(member => (
                      <div key={member.id} onClick={() => handleDeleteMember(member.id)} className="border-gray-300 bg-gray-300 flex items-center gap-3 px-1 py-1 mb-1 cursor-pointer">
                        <div className="flex flex-col items-center justify-center">
                          <img className=' w-[60px] h-[60px]' src={member.image} alt='' />
                          <span className='text-sm text-center'>{member.name}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }

            <button onClick={handleAddTeam} className="hover:bg-gray-300  static w-auto  rounded-lg border bg-gray-200 px-5 py-3 mb-4">
              Guardar
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Modal