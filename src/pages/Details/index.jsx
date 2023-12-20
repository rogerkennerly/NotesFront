import { useEffect, useState } from "react";

import { Container, Links, Content } from "./style.js"

import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api.js"

import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"

export function Details(){
  const [note, setNote] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect (() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setNote(response.data);
      console.log(note);
    }

    fetchNote();
  }, []);

  function handleBackPage(){
    navigate(-1);
  }

  async function handleNoteRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if(confirm){
      await api.delete(`/notes/${note.id}`);
      handleBackPage();
    }
  }
  
  return(
    <Container>

      <Header />

      {
        note &&
        <main>
          <Content>
            <ButtonText text="Excluir nota" onClick={handleNoteRemove} />

            <h1>{note.title}</h1>

            <p>{note.description}</p>

            {
              note.links &&
              <Section text="Links úteis">
                <Links>
                  {
                    note.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} title="Link" target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              note.tags &&
              <Section text="Marcadores">
                {
                  note.tags.map(tag => (
                    <Tag key={tag.id} text={tag.name} />
                  ))
                }
              </Section>
            }
            <Button text="Voltar" onClick={handleBackPage} />
          </Content>
        </main>
      }

    </Container>
  )
}