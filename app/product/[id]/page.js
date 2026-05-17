"use client";
import { useParams } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;

  return <ProductDetailsClient id={id} />;
}
