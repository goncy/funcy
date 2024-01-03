import {redirect} from "next/navigation";

import api from "@/api";

import BuilderPageClient from "./page.client";

export default async function BuilderPage() {
  const players = await api.player.list();

  async function createTeams(formData: FormData) {
    "use server";

    const players = formData.getAll("player");

    const searchParams = new URLSearchParams();

    for (const player of players) {
      searchParams.append("players", player as string);
    }

    redirect(`/armador/partido?${searchParams.toString()}`);
  }

  return <BuilderPageClient players={players} onCreate={createTeams} />;
}
