import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentModal, showModal } from '../../store/modals'
import { getClientsByPageThunk } from '../../store/clients'
import { clearSearchResults, resetLoadingState, searchClientsThunk } from '../../store/searchResults'

import ClientSignupForm from './ClientSignupForm'
import ClientCard from './ClientCard'

const filterClients = (clients, searchTerm) => clients.filter(client => (
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.first_name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    client.last_name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    client.email.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    client.address.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    String(client.phone_number).includes(searchTerm.toLocaleLowerCase()) ||
    String(client.email).includes(searchTerm.toLocaleLowerCase())
))

const ClientListPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { pageNumber } = useParams()

    const [currentPage, setCurrentPage] = useState(+pageNumber)
    const currentUser = useSelector(state => state.session.user)
    const clients = useSelector(state => state.clientInfo.clients)
    const searchResults = useSelector(state => state.searchResults)

    //filter clients by search term & create cards to display
    const [searchTerm, setSearchTerm] = useState("")
    const filteredClients = filterClients(Object.values(clients), searchTerm)
    const searchedClients = filterClients(Object.values(searchResults.clients), searchTerm) || []

    const clientCards = filteredClients.reverse().concat(searchedClients).map((client, i) => (
        <ClientCard key={i} client={client} />
    ))

    useEffect(() => {
        dispatch(getClientsByPageThunk(pageNumber))
    }, [dispatch, currentPage])

    useEffect(() => {
        if (searchTerm.length > 2) {
            const searchDelay = setTimeout(() => {
                dispatch(searchClientsThunk(searchTerm))
            }, 1500)
            return () => clearTimeout(searchDelay)
        }
    }, [searchTerm])

    const newClientPopup = (e) => {
        dispatch(setCurrentModal(ClientSignupForm))
        dispatch(showModal())
    }

    const handlePageChange = (option) => {
        if (currentPage <= 1 && option === 'prev') return
        dispatch(clearSearchResults())
        setCurrentPage(option)
        if (option === "next") {
            setCurrentPage(currentPage + 1)
            history.push(`/clients/page/${currentPage + 1}`)
        } else {
            setCurrentPage(currentPage - 1)
            history.push(`/clients/page/${currentPage - 1}`)
        }
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        if (e.target.value > 2) {
            return dispatch(clearSearchResults())
        }
        dispatch(resetLoadingState())
    }

    const loadingMsg = !searchResults.loaded && searchTerm.length ? "Searching..." :
        searchedClients.length || !searchTerm.length ? null : "No Results Found..."

    return (
        <div className='list-page-wrapper'>
            <h1 className='list-page-title'>Recent Customers</h1>
            <div className='sc-area-wrapper'>
                <div className='sc-search'>
                    <div className='list-area-header'>
                        <div className='sidebar-btn select-page-btn' id='select-page-btn'
                            onClick={() => handlePageChange("prev")}>Previous Page</div >
                        <label>Search Recent Customers</label>
                        <div className='sidebar-btn select-page-btn' id='select-page-btn'
                            onClick={() => handlePageChange("next")}>Next Page</div>
                    </div>
                    <input type='text' placeholder='Name, phone number, email, address etc...'
                        value={searchTerm} onChange={(e) => handleSearch(e)} />
                    {currentUser.access_level > 1 &&
                        <div className='create-new-client-btn' onClick={(e) => newClientPopup(e)}>Create new customer</div>}
                    {loadingMsg}
                </div>
                {clientCards}
            </div>
        </div>
    )
}

export default ClientListPage;
