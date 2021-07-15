import {SiteClient} from 'datocms-client'

export default async function criaComunidade(request, response){
    const TOKEN = process.env.DATO_TOKEN;
    if(request.method==="POST"){
        const client = new SiteClient(TOKEN);

        const record = await client.items.create({
            itemType: "967066", // model ID
            ...request.body
        });

        response.json({
            record:record,
        })
        
        return ;
    }
    else{
        fetch("https://graphql.datocms.com/",{
            method:"POST",
            headers:{
                "Authorization": process.env.DATO_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({"query": `query {
                allCommunities{
                  id,
                  name,
                  link,
                  imageUrl
                }
              }`})
        }).then(async (res)=>{
            const dados = await res.json();
            response.json(dados.data.allCommunities);
        })
            
        return ;
    }
}