export async function getPinnedRepos() {
    const query = `
      query {
        user(login: "onlive1337") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                primaryLanguage {
                  name
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
      
      const pinnedRepos = data.data.user.pinnedItems.nodes.map((node: any) => ({
        name: node.name,
        description: node.description,
        html_url: node.url,
        stargazers_count: node.stargazerCount,
        language: node.primaryLanguage?.name || null,
        topics: node.repositoryTopics.nodes.map((topicNode: any) => topicNode.topic.name)
      }));
  
      return pinnedRepos;
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return [];
    }
  }