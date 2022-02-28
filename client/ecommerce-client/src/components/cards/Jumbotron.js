import TypeWriter from 'typewriter-effect';

const Jumbrotron = ({ text }) => {
  return (
    <TypeWriter options={{
        strings: text,
        autoStart: true,
        loop: true
    }}/>
  )
}

export default Jumbrotron;