import React, { useState, useEffect } from "react"

import { RepositoryItem } from "./RepositoryItem"
import '../styles/repositories.scss'

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [user, setUser] = useState('')

  function handleUser(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setUser(e.currentTarget.value)
    }
  }

  useEffect(() => {
    if (user !== '') {
      fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => response.json())
        .then(data => setRepositories(data))
    }
  }, [user])

  return (
    <section className='repository-list'>
      <div>
        <strong>Insira o nome de um usuário no Github para listar os repositórios</strong>
        <br />
        <input type="text" onKeyPress={handleUser} />
      </div>

      {user !== '' ?
        <>
          <h2>Lista de Repositórios</h2>
          <br/>
          <ul>
            {repositories.map(repository => {
              return <RepositoryItem key={repository.name} repository={repository} />
            })}
          </ul>
        </>
        : null}
    </section>
  )
}