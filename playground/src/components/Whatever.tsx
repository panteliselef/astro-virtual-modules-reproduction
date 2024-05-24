import React from "react";
import { getAlsData } from "als:astro";

export default function Whatever() {
  return <pre>{JSON.stringify(getAlsData())}</pre>;
}
