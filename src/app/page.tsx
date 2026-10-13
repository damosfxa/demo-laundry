import { CekStatus } from "./CekStatus";

type Props = { searchParams: Promise<{ nota?: string }> };

export default async function HalamanCekStatus({ searchParams }: Props) {
  const { nota } = await searchParams;
  return <CekStatus nota={nota ?? ""} />;
}
