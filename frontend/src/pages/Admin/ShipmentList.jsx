import React, { useState } from 'react'
import styles from '../../styles/style'

const ShipmentList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 15
  const packingInformation = JSON.parse(localStorage.getItem('mappedData'))
  const vehicleList = JSON.parse(localStorage.getItem('problem')).vehicle_list
  const distanceMatrix = JSON.parse(
    localStorage.getItem('problem')
  ).distance_matrix
  const orderList = JSON.parse(localStorage.getItem('problem')).order_list
  const shipments = packingInformation
    .map((detail, index) => {
      const vehicleID = vehicleList[index].id

      const ETA =
        detail.length > 0 ? detail[detail.length - 1].arrivalTime : null

      let totalWeigth = 0

      detail.map((order) => {
        order.item_list.map((item) => {
          totalWeigth += item.weight
        })
      })
      let distanceList = []
      let orderIndexList = []
      detail.map((order, index) => {
        const orderIndex = orderList.findIndex(
          (orderA) => orderA.id === order.id
        )
        orderIndexList.push(orderIndex)
        distanceList.push(
          index === 0
            ? distanceMatrix[0][orderIndex + 1]
            : distanceMatrix[orderIndexList[index - 1] + 1][
                orderIndexList[index] + 1
              ]
        )
      })
      const totalDistance = distanceList.reduce(
        (total, distance) => total + distance,
        0
      )
      return {
        id: vehicleID,
        departure: '09:00',
        ETA: ETA,
        total_weight: totalWeigth / 1000,
        total_distance: totalDistance,
        packing_information: detail,
      }
    })
    .filter((shipment) => shipment.packing_information.length > 0)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentShipments = shipments.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(shipments.length / rowsPerPage)

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id))
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          id={i}
          onClick={handleClick}
          className={`${
            currentPage === i
              ? 'text-highlight cursor-pointer'
              : 'cursor-pointer'
          } inline-block mx-1 px-2 py-1 border border-gray-200 rounded`}
        >
          {i}
        </li>
      )
    }
    return pageNumbers
  }

  return (
    <div className="p-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary`}>
        Delivery List
      </h4>
      <div className="bg-bg_card shadow-xl rounded-lg pt-6 pb-4 px-4 mt-5 border-gray-200">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md text-text_primary ">
          <thead className="bg-gray-100 border-b border-gray-200 text-lg">
            <tr>
              <th className="py-2 px-4 text-left">Vehicle ID</th>
              <th className="py-2 px-4 text-left">Departure</th>
              <th className="py-2 px-4 text-left">ETA</th>
              <th className="py-2 px-4 text-left">Total Weight</th>
              <th className="py-2 px-4 text-left">Total Distance</th>
            </tr>
          </thead>
          <tbody>
            {currentShipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-b border-gray-200 text-base font-medium"
              >
                <td className="py-2 px-4">{shipment.id}</td>

                <td className="py-2 px-4">{shipment.departure}</td>
                <td className="py-2 px-4">{shipment.ETA}</td>
                <td className="py-2 px-4">
                  {shipment.total_weight.toFixed(2)} KG
                </td>
                <td className="py-2 px-4">
                  {shipment.total_distance.toFixed(2)} KM
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-4 flex justify-center">{renderPageNumbers()}</ul>
      </div>
    </div>
  )
}

export default ShipmentList
