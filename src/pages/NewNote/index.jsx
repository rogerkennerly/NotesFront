import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { ButtonText } from "../../components/ButtonText"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"

import { api } from "../../services/api"

import { Container, Form } from "./style";

export function NewNote(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  function handleBackPage(){
    navigate(-1);
  }

  async function handleNewNote(){
    if(!title){
      return alert("Digite o titulo da nota");
    }
    if(newTag){
      return alert("Salve ou remova a tag para salvar a nota.");
    }
    if(newLink){
      return alert("Salve ou remova o link para salvar a nota.");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso.");
    navigate(-1);
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText text="Voltar" onClick={handleBackPage} />
          </header>

          <Input 
            placeholder="Titulo"
            onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
            placeholder="Texto" 
            onChange={e => setDescription(e.target.value)}
          />

          <Section text="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link" 
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section text="Marcadores" >
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                  key={String(index)}
                    value={tag} 
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
                isNew 
                placeholder="Nova Tag" 
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            text="Salvar" 
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}