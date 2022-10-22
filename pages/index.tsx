import { log } from 'console'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'//セマンティックUIをインポートする
import { Loader } from 'semantic-ui-react'//ローダーをインポートする

//猫のAPIの型を定義しておく
interface SearchCatImage {
  id: string
  url: string
  width: number
  height: number
}
//猫のAPIのURLの型を指定しておく
interface IndexPageProps {
  initialCatImageUrl: string
}
//<>にinterface IndexPagePropsを使う。こうするとPropsが使える
const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search")
  const result = await res.json()// JSONに変換する
  // console.log(result[0])
  return result[0]
  }

const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  //猫のAPIのURLを保存する
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl)
  //ローディングの状態変数
  const [isLoading, setIsLoading] = useState(false)

  //ボタンをクリックすると猫のAPIをGETする
  const handleClick = async () => {
    setIsLoading(true)
    const catImage = await fetchCatImage()
    setCatImageUrl(catImage.url)
    setIsLoading(false)
  }

  return (
    <div className={styles.container}>
      <h1>猫画像アプリ</h1>
      {isLoading ? (
        <Loader active />
      ): (
        <img src={catImageUrl} alt="猫さんの画像"
        width={500}
        height="auto"
        />
      )}
        <button className={styles.btn} onClick={handleClick}>今日の猫さん</button>
    </div>
  )
}
//SSR(サーバーサイドレンダリング)
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImageUrl = await fetchCatImage()
  return {
    props: {
      initialCatImageUrl: catImageUrl.url
    }
  }
}

export default Home
