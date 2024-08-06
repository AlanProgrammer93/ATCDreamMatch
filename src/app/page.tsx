"use client";

import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Modal from "@/components/modal";
import { Team, useTeamStore } from "@/store/teams";
import ModalEdit from "@/components/modalEdit";

export default function Home() {
  const teams = useTeamStore((state) => state.teams);
  const removeTeam = useTeamStore((state) => state.removeTeam);
  const removeMember = useTeamStore((state) => state.removeMember);
  const players = useTeamStore((state) => state.players);

  const [teamSelected, setTeamSelected] = useState<Team | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  const handleTeamSelected = (team: Team) => {
    setTeamSelected(team)
  }

  const handleEditSelected = (team: Team) => {
    setTeamSelected(team)
    setShowModalEdit(true)
  }

  const handleDeleteTeam = (name: string) => {
    const players = teams.find((team) => team.name !== name)
    players?.members?.map(player => removeMember(player.id))
    removeTeam(name);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl text-sm lg:flex">
        <button 
          onClick={() => setShowModal(true)} 
          className="fixed hover:bg-gray-300 p-2 left-0 top-0 flex w-full justify-center border-b bg-gray-200 lg:static lg:w-auto lg:rounded-lg lg:border lg:bg-gray-200 lg:px-5 lg:py-3 mb-2">
          Crear Equipo
        </button>
      </div>

      <div className="flex flex-col w-full lg:max-w-5xl lg:flex-row gap-2">
        <div className="rounded-lg  px-5 py-4 border-gray-100 bg-gray-100 flex-1 h-[200px]">
          <h1 className="text-center mb-2">Listado De Equipos</h1>
          {
            teams.map(team => (
              <div key={team.name} className="rounded-lg border-gray-300 bg-gray-300 flex items-center justify-between gap-3 px-5 py-3 mb-3">
                <h2 onClick={() => handleTeamSelected(team)} className="cursor-pointer flex-1">{team.name}</h2>
                <div className="flex items-center gap-2">
                  <IoCloseCircleOutline onClick={() => handleDeleteTeam(team.name)} className="text-red-700 text-2xl cursor-pointer" />
                  <FaEdit onClick={() => handleEditSelected(team)} className="text-blue-400 text-2xl cursor-pointer" />
                </div>
              </div>
            ))
          }
        </div>


        <div className="rounded-lg  px-5 py-4 border-gray-100 bg-gray-100 flex-1 h-[60vh]">
          {
            teamSelected ? (
              <>
                <h2 className="text-center text-2xl mb-2">{teamSelected.name}</h2>
                <div className="h-[45vh] scrollbar overflow-y-auto">
                  {
                    teamSelected.members.map(member => (
                      <div key={member.id} className="rounded-lg border-gray-300 bg-gray-300 flex items-center gap-3 px-3 py-1 mb-1">
                        <img className=' w-[50px] h-[50px]' src={member.image} alt='' />
                        <h2 className="text-2xl">{member.name}</h2>
                      </div>
                    ))
                  }
                </div>
              </>
            ) : (
              <h2 className="text-center text-2xl mb-2">Selecciona un Equipo</h2>
            )
          }
        </div>

      </div>
      {
        players.length === 10 ? <h2 className="text-center text-2xl mt-3 text-green-600">Tus Equipos Estan Listos!</h2>
          : <h2 className="text-center text-2xl mt-3 text-red-600">Tus Equipos Estan Incompletos!</h2>
      }

      {
        showModal && <Modal setShowModal={setShowModal} />
      }
      {
        showModalEdit && <ModalEdit setShowModal={setShowModalEdit} teamSelected={teamSelected} />
      }
    </main>
  );
}
