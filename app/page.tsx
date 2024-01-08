import Image from 'next/image'
import Myheader from './Layouts/header'
import GetPrice from './Tools/getprice'

export default function Home() {
  return (
    <>
    <Myheader />

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <GetPrice />
    </main>
    </>
  )
}
