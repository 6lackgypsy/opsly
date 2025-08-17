import { useEffect, useState } from "react"

const Greeting = () => {
  const [greeting, setGreeting] = useState(getGreeting())

  function getGreeting() {
    const hours = new Date().getHours()

    return hours < 12
      ? "Good Morning"
      : hours < 18
        ? "Good Afternoon"
        : "Good Evening"
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return <span>{greeting}</span>
}

export default Greeting
