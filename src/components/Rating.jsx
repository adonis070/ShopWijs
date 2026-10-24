import '../styles/Rating.css'

const MAX_STARS = 5

function Rating({ rate, count }) {
  const filledStars = Math.round(rate)
  const formattedRate = rate.toLocaleString('nl-NL', {
    minimumFractionDigits: 1,
  })

  return (
    <p className="rating">
      <span className="rating__stars" aria-hidden="true">
        {'★'.repeat(filledStars)}
        {'☆'.repeat(MAX_STARS - filledStars)}
      </span>
      <span>
        {formattedRate} / {MAX_STARS}
      </span>
      {count !== undefined && (
        <span className="rating__count">({count} beoordelingen)</span>
      )}
    </p>
  )
}

export default Rating
