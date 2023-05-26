import style from './NavBar.module.css'
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <div className={style.div}>
        <SearchBar/>
    </div>
  )
}
