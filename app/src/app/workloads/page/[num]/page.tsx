export default function Page({ params }: { params: { num: string } }) {
  return <p>Number: {params.num}</p>
}
