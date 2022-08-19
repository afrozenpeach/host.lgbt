import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowProviderService } from 'src/app/services/windowProvider/window-provider.service';
import { Apollo, gql } from 'apollo-angular';

const blogQuery = gql`
  query getBlogInfo($domain: String!) {
    blogs(filters:{Domain:{eq:$domain}}) {
      data {
        id,
        attributes {
          Name,
          Subtitle,
          Title,
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const altDomainQuery = gql`
  query getPrimaryDomain($domain: JSON!) {
    blogs(filters:{AlternateDomains:{contains:$domain}}) {
      data {
        id,
        attributes {
          Domain
        }
      }
    }
  }
`;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  hostname = '';
  name = '';
  title = '';
  subtitle = '';
  imageUrl = '';

  constructor(
    private windowService: WindowProviderService,
    private route: ActivatedRoute,
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
        query: blogQuery,
        variables: {
          domain: this.hostname
        }
      })
      .valueChanges.subscribe((result: any) => {

        if (result?.data?.blogs?.data.length > 0) {
          this.name = result?.data?.blogs?.data[0].attributes.Name;
          this.title = result?.data?.blogs?.data[0].attributes.Title;
          this.subtitle = result?.data?.blogs?.data[0].attributes.Subtitle;
          this.imageUrl = result?.data?.blogs?.data[0].attributes.Image?.data?.attributes?.url;
        } else {
          this.apollo
            .watchQuery({
              query: altDomainQuery,
              variables: {
                domain: this.hostname
              }
            })
            .valueChanges.subscribe((result: any) => {
              if (result?.data?.blogs?.data.length > 0) {
                this.windowService.forward('https://' + result.data.blogs.data[0].attributes.Domain);
              }
            })
        }
      });
  }

}
