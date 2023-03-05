import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  public isLoading = false;
  public searchTerm: string = '';
  public articles: any[] = [];
  public searchUpdate = new Subject<string>();

  constructor(
    private toastr: ToastrService,
    private articeService: ArticleService
  ) {
    this.searchUpdate.pipe(
      debounceTime(750),
      distinctUntilChanged())
      .subscribe(() => {
        this.fetchData();
      })
  }

  ngOnInit(): void {
    this.fetchData();
  }

  public valueChange(text: string) {
    this.searchUpdate.next(text);
  }

  public fetchData(): void {
    this.isLoading = true;
    this.articeService.getArticles().subscribe({
      next: (res: any) => {
        // added timeout in order to implement the delay that a server response would have
        setTimeout(() => {  
          this.isLoading = false;
          this.articles = res.filter((article: any) =>
            article.attributes.title
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          );
        }, 500);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Something went wrong while fetching data!');
      }
    });
  }

  public clearFilter(): void {
    this.searchTerm = '';
    this.fetchData();
  }
}
