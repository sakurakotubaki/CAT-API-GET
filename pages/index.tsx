import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const fetchCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search")
  const result = await res.json()// JSONに変換する
  console.log(result)
  }
  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
        <img src="https://cdn2.thecatapi.com/images/ac4.jpg" alt=""
        width={500}
        height="auto"
        />
        <button className={styles.btn} onClick={fetchCatImage}>今日の猫さん</button>
    </div>
  )
}

export default Home
