import React from 'react'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>{propriedades.githubUser}</a>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function CommunityBox(props){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.boxName} ({props.items.length})
      </h2>

      <ul>
        {props.items.slice(0,6).map((item) => {
          return (
            <li  key={item.id}>
              <a href={item.link}>
                <img src={item.image} />
                <span>{item.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([
    {
      id: Math.random(),
      name: "TopWay School",
      image: "https://www.topwayschool.com/tw/icons/a-brand-oficial.svg",
      link: "https://topwayschool.com/",
    },
    {
      id: Math.random(),
      name: "UFPel",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/49/UFPEL-ESCUDO-2013.png",
      link: "https://portal.ufpel.edu.br/",
    },
    {
      id: Math.random(),
      name: "Laravel",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/250px-Laravel.svg.png",
      link: "https://laravel.com/",
    }
  ]);
  const user = 'mwnoremberg';
  const friends = [{
      id: Math.random(),
      name: "zenorocha",
      image: "https://github.com/zenorocha.png",
      link: "https://github.com/zenorocha",
    },
    {
      id: Math.random(),
      name: "Aline Noremberg",
      image: "https://media-exp1.licdn.com/dms/image/C4D03AQFKJ3XMEYlV5A/profile-displayphoto-shrink_400_400/0/1607473667561?e=1631750400&v=beta&t=FXEHDp3JdoN-r6SOahyogKvNwHm2uD_w8UglgUPLr20",
      link: "https://www.linkedin.com/in/aline-noremberg-386b5aa0/",
    },
    {
      id: Math.random(),
      name: "Economista Sincero",
      image: "https://pbs.twimg.com/profile_images/1391965232432656389/rriedcEi_400x400.jpg",
      link: "https://twitter.com/mendlowicz",
    },
    {
      id: Math.random(),
      name: "peas",
      image: "https://github.com/peas.png",
      link: "https://github.com/peas",
    },
    {
      id: Math.random(),
      name: "thiagodavison",
      image: "https://github.com/thiagodavison.png",
      link: "https://github.com/thiagodavison",
    },
    {
      id: Math.random(),
      name: "Fernando Ulrich",
      image: "https://pbs.twimg.com/profile_images/1366893629244141573/9CYfetId_400x400.jpg",
      link: "https://twitter.com/fernandoulrich",
    },
    {
      id: Math.random(),
      name: "sergiolopes",
      image: "https://github.com/sergiolopes.png",
      link: "https://github.com/sergiolopes",
    },
  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(()=>{
    fetch("https://api.github.com/users/peas/followers")
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      setSeguidores(json.map((seguidor)=>{
        return {
          id: seguidor.id,
          name: seguidor.login,
          image: seguidor.avatar_url,
          link: seguidor.html_url
        }
      }))
    })
  }, [])

  return (
    <>
    <AlurakutMenu githubUser={user}/>
    <MainGrid>
      <div className="profileArea" style={{gridArea:"profileArea"}}>
        <ProfileSidebar githubUser={user} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a) 
          </h1>
          <OrkutNostalgicIconSet recados="3" fotos="5" mensagens="2" confiavel="3" />
        </Box>
        <Box>
          <h2 className="subTitle">O que você quer fazer?</h2>
          <form onSubmit={function handleCreateCommunity (e){
            e.preventDefault();
            const dadosForm = new FormData(e.target);
            const novaComunidade = {name:dadosForm.get("name"), image: dadosForm.get("image"), link: dadosForm.get("link")}
            const comunidadesNovo = [...comunidades, novaComunidade]
            setComunidades(comunidadesNovo);
          }}>
            <div>
              <input type="text" placeholder="Qual o nome da sua comunidade?" name="name" aria-label="Qual o nome da sua comunidade?" required/>
              <input type="text" placeholder="Link da imagem da sua comunidade" name="image" aria-label="Link da imagem da sua comunidade" required/>
              <input type="text" placeholder="Link da sua comunidade" name="link" aria-label="Link da sua comunidade" required/>
              <button>Criar comunidade</button>
            </div>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <CommunityBox boxName="Seguidores" items={seguidores}></CommunityBox>
          <CommunityBox boxName="Comunidades" items={comunidades}></CommunityBox>
          <CommunityBox boxName="Pessoas da comunidade" items={friends}></CommunityBox>
        </div>
    </MainGrid>
    </>
  );
}
