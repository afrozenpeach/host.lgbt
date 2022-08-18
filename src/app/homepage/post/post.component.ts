import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { WindowProviderService } from 'src/app/services/windowProvider/window-provider.service';

const postQuery = gql`
  query getPost($id: ID!, $domain: String!, $slug: String!) {
    blogPosts(filters:{Blogs:{Domain:{eq:$domain}},id:{eq:$id},Slug:{eq:$slug}},sort:"PostDate:desc") {
      data {
        id,
        attributes {
          PostDate,
          Title,
          Content
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
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private windowService: WindowProviderService,
    private apollo: Apollo
  ) {
    this.hostname = windowService.getHostname();
  }

  hostname = '';
  id = '';
  slug = '';
  post: any = null;

  ngOnInit(): void {
    if (this.hostname == 'localhost') {
      this.route.parent?.params.subscribe(params => {
        this.hostname = params['domain'];

        if (this.hostname == undefined) {
          this.hostname = 'host.lgbt';
        }
      });
    }

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.slug = params['slug'];
    });

    this.apollo
      .watchQuery({
        query: postQuery,
        variables: {
          domain: this.hostname,
          id: this.id,
          slug: this.slug
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.post = result?.data?.blogPosts?.data?.[0];
      });
  }

}
