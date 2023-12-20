import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi"
import {Container, Brand, Menu, Search, Content, NewNote} from "./style"

import { Header } from "../../components/Header"
import { ButtonText } from "../../components/ButtonText"
import { Section } from "../../components/Section"
import { Input } from "../../components/Input"
import { Note } from "../../components/Note"
import { api } from "../../services/api"

export function Home(){
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagsSelected(tagName){
    if(tagName === "todos"){
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);

    if(alreadySelected){
      setTagsSelected(tagsSelected.filter(tag => tag !== tagName));
    }else{
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }

  function handleNoteDetails(noteId){
    navigate(`/details/${noteId}`);
  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      console.log(response);
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>MyNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
          text="Todos" 
          onClick={() => handleTagsSelected("todos")}
          isActive={tagsSelected.length === 0}
          />
        </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
                text={tag.name} 
                onClick={() => handleTagsSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch} 
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section text="Minhas notas">
          {
            notes.map(note => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleNoteDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/newnote">
        <FiPlus/>
        Criar Nota
      </NewNote>
    </Container>
  )
}