"use client";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ProductDetailsClient from './ProductDetailsClient';

function ProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // بياخد الـ ID لايف من الرابط

  return <ProductDetailsClient id={id} />;
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '100px' }}>جاري التحميل...</div>}>
      <ProductContent />
    </Suspense>
  );
}
