'use server';

import { api } from "~/trpc/server";
import { schemaProps } from "./schema";

export async function handleForm(data: schemaProps) {
    //#TODO corrigir erro RangerErro
    const createEmployee = await api.employees.create.mutate({...data, salary: Number(data.salary)});
  }