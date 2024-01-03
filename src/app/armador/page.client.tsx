"use client";

import type {Player} from "@/types";

import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";

export default function BuilderPageClient({
  players: initialPlayers,
  onCreate,
}: {
  players: Player[];
  onCreate: (formData: FormData) => void;
}) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const {toast} = useToast();

  function handleAddPlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("player")) {
      return toast({title: "El campo nombre es requerido", duration: 1500});
    }

    setPlayers((players) =>
      players.concat({name: formData.get("player") as string, score: 0, matches: 0}),
    );

    event.currentTarget.reset();
  }

  return (
    <section className="m-auto grid max-w-md gap-4">
      <form className="flex gap-4" onSubmit={handleAddPlayer}>
        <Input name="player" placeholder="Nombre del jugador" />
        <Button type="submit" variant="secondary">
          Agregar jugador
        </Button>
      </form>
      <form action={onCreate} className="grid gap-4">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map(({name}) => (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell className="text-right">
                  <Checkbox name="player" value={name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="submit">Armar equipos</Button>
      </form>
    </section>
  );
}
