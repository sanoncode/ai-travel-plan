/* eslint-disable react/prop-types */

function Images({alt, className, src}) {
  return <img src={src} alt={alt} className={className} referrerPolicy='no-referrer' loading="lazy" />
}

export default Images