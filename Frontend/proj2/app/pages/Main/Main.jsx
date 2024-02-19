"use client"
import { FaAddressBook } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs"
import { BsFileEarmarkText } from "react-icons/bs";
import './Main.css'
import Link from "next/link";

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const Main = () => {
  return (
     <>
    <div className="container12">
    <div className="h-container12">
    <FaAddressBook size="30px"/>
    <strong><h1>Data Dictionary</h1></strong>
    </div>
    <div className="sections12">
    <div className="card1">
    <Link href="./Students/Students"><BsPeopleFill size={80} color="blue"/></Link>
    <center><h2 style={{color: 'black'}}>Student's</h2></center>
    </div>
    <div className="card12">
    <Link href="./Subject/Subject"><BsPersonFill size={80} color="blue"/></Link>
    <center><h2 style={{color: 'black'}}>Teacher</h2></center>
    </div>
    <div className="card12">
    <Link href="./Teachers/Teacher"><BsFileEarmarkText size={80} color="blue"/></Link>
    <center><h2 style={{color: 'black'}}>Subject</h2></center>
    </div>
    </div>
    </div>
    </>
  )
}

export default Main