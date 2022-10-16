import React, {useEffect, useState} from 'react'
import he from 'he'

const WordOfTheDay = () => {
window.AudioContext = window.AudioContext||window.webkitAudioContext;
const myAudioContext = new AudioContext();

//https://random-word-api.herokuapp.com/word
//https://www.wordsapi.com/

//https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key

  const [wordOfTheDay, setWordOfTheDay] = useState('')
  const [definition, setDefinition] = useState([])
  const [examples, setExamples] = useState([])
  const [audio, setAudio] = useState('')
  const [picture, setPicture] = useState('')

  const chainReq = async () => {
    const getRandomWord = await fetch('https://random-word-api.herokuapp.com/word?lang=en').then(res => res.json())
    setWordOfTheDay(getRandomWord)
    const data = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${getRandomWord}?key=${process.env.REACT_APP_WEBSTER_KEY}`).then(res => res.json())
    setDefinition(data[0]?.shortdef)
    const example = await data[0]?.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[1]?.[1]?.[0]?.t
    const decoded = await example?.toString().replaceAll(/{..}/g,"").replaceAll(/{\/..}/g, "")
    setExamples( example ? he.decode(decoded) : 'No examples found')
    setAudio(data[0]?.hwi?.prs[0]?.sound?.audio)
    setPicture(data[0]?.art?.artid)
  }


  //https://media.merriam-webster.com/audio/prons/en/us/mp3/number/3d000001.mp3
  //https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.charAt(0)}/${audio}.mp3

  function playSound(audio) {
      if (audio) {
        myAudioContext.resume().then(() => {
        const a = new Audio(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.charAt(0)}/${audio}.mp3`);
        a.loop = false;
        a.currentTime = 0;
        a.volume = 0.2;
        a.play()
      })
    }
  }

  useEffect(() => {
    chainReq()
  }, [])

  return (
    <div className="wrapper">
      <h2>Today's word of the day</h2>
      <h3>Will be...</h3>
      <b>
        {wordOfTheDay}
      </b>
      <br/>
      <img src={picture ? `https://www.merriam-webster.com/assets/mw/static/art/dict/${picture}.gif` : ''} alt={picture ? wordOfTheDay : 'no image found'}/>
      <br/>
      {definition?.map((item, index) => {
        return <div key={index}>{item}</div>
      })}
      <h4>Examples: </h4>
      {
        examples
      }
      <h4>
        Audio:
      </h4>
      <button onClick={() => playSound(audio)}>Play it!</button>
    </div>
  )
}

export default WordOfTheDay