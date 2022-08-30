// eslint-disable-next-line
/* eslint-disable */

const paginar = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
const paginate = (array, pageSize) => {
  return array.reduce((acc, val, i) => {
    let idx = Math.floor(i / pageSize)
    let page = acc[idx] || (acc[idx] = [])
    page.push(val)

    return acc
  }, [])
}

export { paginar, paginate };