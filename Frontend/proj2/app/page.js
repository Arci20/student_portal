import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./pages/Navbar/Navbar";
import Main from "./pages/Main/Main";
import { useRouter } from 'next/navigation';
import Students from "./pages/Students/Students";
import Teacher from "./pages/Teachers/Teacher";
import Subject from "./pages/Subject/Subject";


export default function Home() {
  return (
    <>
    <Navbar/>
    <Subject/>
    {/* <Teacher/> */}
    {/* <Students /> */}
    {/* <Main/> */}
    </>
  );
}
