import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { WindowProviderService } from 'src/app/services/windowProvider/window-provider.service';

const postsQuery = gql`
  query getPosts($featured: Boolean, $domain: String!) {
    blogPosts(filters:{Blogs:{Domain:{eq:$domain}},Featured:{eq:$featured}},sort:"PostDate:desc") {
      data {
        id,
        attributes {
          PostDate,
          Title,
          Summary,
          Slug,
          Blogs {
            data {
              attributes {
                Domain
              }
            }
          }
          Image {
            data {
              id,
              attributes {
                name,
                alternativeText,
                caption,
                url,
                formats
              }
            }
          },
          Author {
            data {
              id,
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

@Component({
  selector: 'app-index-content',
  templateUrl: './index-content.component.html',
  styleUrls: ['./index-content.component.scss']
})
export class IndexContentComponent implements OnInit {

  hostname = '';
  posts = [];
  featured = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private windowService: WindowProviderService,
    private apollo: Apollo
  ) {
    this.hostname = windowService.getHostname();
  }

  ngOnInit(): void {
    if (this.hostname == 'localhost') {
      this.route.params.subscribe(params => {
        this.hostname = params['domain'];

        if (this.hostname == undefined) {
          this.hostname = 'host.lgbt';
        }
      });
    }

    this.apollo
      .watchQuery({
        query: postsQuery,
        variables: {
          domain: this.hostname,
          featured: true
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.featured = result?.data?.blogPosts?.data;
      });

    this.apollo
      .watchQuery({
        query: postsQuery,
        variables: {
          domain: this.hostname,
          featured: false
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.posts = result?.data?.blogPosts?.data;
      });
  }

}
