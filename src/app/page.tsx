"use client";

import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Modal from "@/components/modal";
import { Team, useTeamStore } from "@/store/teams";

export default function Home() {
  const teams = useTeamStore((state) => state.teams);
  const [teamSelected, setTeamSelected] = useState<Team | null>(null)
  console.log("teams: ", teams);

  const [showModal, setShowModal] = useState(false)

  const handleTeamSelected = (team: Team) => {
    setTeamSelected(team)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl text-sm lg:flex">
        <button onClick={() => setShowModal(true)} className="fixed hover:bg-gray-300 left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 lg:static lg:w-auto  lg:rounded-lg lg:border lg:bg-gray-200 lg:px-5 lg:py-3 mb-2">
          Crear Equipo
        </button>
      </div>

      <div className="flex lg:w-full lg:max-w-5xl gap-2">
        <div className="rounded-lg  px-5 py-4 border-gray-100 bg-gray-100 flex-1 h-[200px]">
          <h1 className="text-center mb-2">Listado De Equipos</h1>
          {
            teams.map(team => (
              <div key={team.name} onClick={() => handleTeamSelected(team)} className="rounded-lg border-gray-300 bg-gray-300 flex items-center justify-between gap-3 px-5 py-3 mb-3">
                <h2 className="cursor-pointer flex-1">{team.name}</h2>
                <div className="flex items-center gap-2">
                  <IoCloseCircleOutline className="text-red-700 text-2xl cursor-pointer" />
                  <FaEdit className="text-blue-400 text-2xl cursor-pointer" />
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
                {
                  teamSelected.members.map(member => (
                    <div key={member.id} className="rounded-lg border-gray-300 bg-gray-300 flex items-center gap-3 px-3 py-1 mb-1">
                      <img className=' w-[50px] h-[50px]' src={member.image} alt='' />
                      <h2 className="text-2xl">{member.name}</h2>
                    </div>
                  ))
                }
              </>
            ) : (
              <h2 className="text-center text-2xl mb-2">Selecciona un Equipo</h2>
            )
          }
        </div>

      </div>
      {
        showModal && <Modal setShowModal={setShowModal} />
      }
    </main>
  );
}
