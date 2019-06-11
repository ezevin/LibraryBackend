import React, { Component } from 'react'
import { Header, Grid, Search } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

class FinishedPictures extends Component {

  state = {
    search: ''
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    console.log(value)
  }

  render(){
    const filtered = this.props.projects.filter(project => {
      return project.title.toLowerCase().includes(this.state.search.toLowerCase())
    })
    // const research = this.props.research.filter(research => {
    //   if(research.project_id === this.props.projectId){
    //     return research.image
    //   }
    // })
    // console.log(this.props);
    return(
      <>
        <Grid >
        <Grid.Column width={6}>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <center>
            <Search width={15} onSearchChange={this.handleSearch} showNoResults={false} />
          </center><br />
        </Grid.Column>
        </Grid>
        <Grid columns={5} padded className="link cards">
          {filtered.map(project =>(
             <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList}   allNotes={this.props.allNotes}/>
          ))}
        </Grid>





      </>
    )
  }
}

export default FinishedPictures
