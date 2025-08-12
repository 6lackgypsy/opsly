import { useEffect } from "react"

export default function MetaManager({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      let metaDesc = document.querySelector("meta[name='description']")

      if (!metaDesc) {
        metaDesc = document.createElement("meta")
        metaDesc.name = "description"
        document.head.appendChild(metaDesc)
      }

      metaDesc.content = description
    }
  }, [title, description])

  return null
}
