'use server';

import { api } from "~/trpc/server";
import { schemaProps } from "./schema";

export async function handleForm(data: schemaProps) {
    //TODO corrigir erro RangerErro

    const {salary} = data

    const Salary = parseInt(salary)

    const result = {data, Salary}

    console.log(result)

   // const createEmployee = await api.employees.create.mutate({...data, salary: Number(data.salary)});
  }