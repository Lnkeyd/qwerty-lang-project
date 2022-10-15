import React, {useEffect, useState} from 'react'
import he from 'he'

const WordOfTheDay = () => {
window.AudioContext = window.AudioContext||window.webkitAudioContext;
const myAudioContext = new AudioContext();
const audioCtx = new AudioContext();

//https://random-word-api.herokuapp.com/word
//https://www.wordsapi.com/

//https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key

  const [wordOfTheDay, setWordOfTheDay] = useState('')
  const [definition, setDefinition] = useState([])
  const [examples, setExamples] = useState([])
  const [audio, setAudio] = useState()

  const chainReq = async () => {
    const getRandomWord = await fetch('https://random-word-api.herokuapp.com/word?lang=en').then(res => res.json())
    setWordOfTheDay(getRandomWord)
    const getDefinition = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${getRandomWord}?key=${process.env.REACT_APP_WEBSTER_KEY}`).then(res => res.json())
    setDefinition(getDefinition[0].shortdef)
    const example = await getDefinition[0]?.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[1]?.[1]?.[0]?.t
    const decoded = await example?.toString().replaceAll(/{..}/g,"").replaceAll(/{\/..}/g, "")
    setExamples( example ? he.decode(decoded) : 'No examples found')
    setAudio(getDefinition[0].hwi.prs[0].sound.audio)
  }


  //https://media.merriam-webster.com/audio/prons/en/us/mp3/number/3d000001.mp3
  //https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.charAt(0)}/${audio}.mp3

  function playSound(audio) {
    const a = new Audio(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.charAt(0)}/${audio}.mp3`);
    audioCtx.resume()
    a.play();
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
      <button onClick={audio && playSound(audio)}>Play it!</button>
    </div>
  )
}

export default WordOfTheDay