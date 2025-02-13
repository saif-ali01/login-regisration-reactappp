
import { FaGithub, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa'

const IconList = () => {
 
    return (
        <ul className="list-none flex mt-5">

            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <a href="#">
                    <FaGooglePlusG className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
                </a>
            </li>
            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <a href="https://www.linkedin.com/in/saif-ali-285581243/">
                    <FaLinkedinIn className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
                </a>
            </li>
            <li className="p-2 rounded-full flex text-gray-200 hover:text-white m-2 justify-center items-center border-[1px] shadow-sm shadow-gray-400 ">
                <a href="https://github.com/saif-ali01">
                    <FaGithub className="transition-transform duration-700 ease-in-out  hover:scale-150" size={20} />
                </a>
            </li>
        </ul>
    
  )
}

export default IconList

