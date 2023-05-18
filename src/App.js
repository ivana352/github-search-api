import { useState, useEffect } from 'react';
import './App.css';
import { Form } from 'semantic-ui-react';
import { Card, Icon, Image } from 'semantic-ui-react'

function App() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    fetch('https://api.github.com/users/example')
    .then(res => res.json())
    .then(data => {
      setData(data)
    });
  }, []);

  const setData = ({ 
    name, 
    login, 
    followers, 
    following, 
    public_repos, 
    avatar_url,
    location,
    bio

  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setLocation(location);
    setBio(bio)
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        setError(data.message)
      }
      else {
        setData(data);
        setError(null);
      }
    })
  }


  return (
    <div>
        <div className='navbar'>
          <h1>Github search</h1>
        </div>

        <div className='search'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input placeholder='GitHub user' name='github-user' onChange={handleSearch}/>
              <Form.Button content='Search' />
            </Form.Group>
          </Form>
        </div>


        {error ? 
        (<h1>{error}</h1>
        ) : (
          <div className='card'>
          <Card>
            <Image src={avatar} wrapped ui={false} />

            <Card.Content>
              <Card.Header> {name} </Card.Header>
              <Card.Header> {userName} </Card.Header>

                <Card.Meta>
                  <span>
                    {bio} User info
                  </span>
                </Card.Meta>
            </Card.Content>

            <Card.Content extra>
                <Icon name='user' />
                  {followers} Followers
            </Card.Content>

            <Card.Content extra>
                <Icon name='user' />
                  {following} Following
            </Card.Content>

            <Card.Content extra>
                <Icon name='user' />
                  {location}
            </Card.Content>

            <Card.Content extra>
                <Icon name='user' />
                  {repos} Repositories
            </Card.Content>

          </Card>
        </div>
        )}        
    </div>
  );
}

export default App;
