import type { GithubResponse, GithubRepository } from '../types';

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

    const { data } = (await response.json()) as GithubResponse;
    
    return data.user.pinnedItems.nodes.map((repo: GithubRepository) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      stargazers_count: repo.stargazerCount,
      language: repo.primaryLanguage?.name ?? null,
      topics: repo.repositoryTopics.nodes.map(node => node.topic.name)
    }));
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}