import { log } from 'console'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

interface SearchCatImage {
  id: string
  url: string
  width: number
  height: number
}

const Home: NextPage = () => {
  const [catImageUrl, setCatImageUrl] = useState("")

  const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search")
  const result = await res.json()// JSONに変換する
  // console.log(result[0])
  return result[0]
  }

  const handleClick = async () => {
    const catImage = await fetchCatImage()
    setCatImageUrl(catImage.url)
  }

  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
        <img src={catImageUrl} alt=""
        width={500}
        height="auto"
        />
        <button className={styles.btn} onClick={handleClick}>今日の猫さん</button>
    </div>
  )
}

export default Home
