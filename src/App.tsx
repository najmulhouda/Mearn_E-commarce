import axios from "axios"
import { useEffect, useState } from "react"

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos",
        )
        setPhotos(response.data)
      } catch (error) {
        console.error("Error fetching photos:", error)
      }
    }

    fetchData()
  }, [])

  const isPinkBorder = (albumId, id) => (albumId + id) % 2 === 0
  const today = new Date().getDay()

  return (
    <div>
      {photos
        .filter(photo => [0, 2, 4, 6].includes(today) && photo.id % 2 !== 0)
        .map(photo => (
          <div
            key={photo.id}
            style={{
              display: "inline-block",
              margin: "10px",
              border: isPinkBorder(photo.albumId, photo.id)
                ? "2px solid pink"
                : "none",
            }}
          >
            <img src={photo.url} alt={photo.title} />
          </div>
        ))}
    </div>
  )
}

export default PhotoGallery
