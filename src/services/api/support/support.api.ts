import ApiService from '../api-service';
import { IFaq } from './dto/faq.dto';

class SupportApiService extends ApiService {
  getFaq = async (): Promise<IFaq[]> => {
    // return await this.get(`/faq`).then((res) => res.data);
    return await [
      {
        title: 'How do I invest in stocks?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. Velit maxime neque est id nisi unde.`,
      },
      {
        title: 'How can I improve my time management skills?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. Velit maxime neque est id nisi unde.`,
      },
      {
        title: 'What is the capital of the United States?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. Velit maxime neque est id nisi unde.`,
      },
      {
        title: 'How do I prepare for a job interview?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. Velit maxime neque est id nisi unde.`,
      },
      {
        title: 'What is the meaning of life?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. Velit maxime neque est id nisi unde.`,
      },
      {
        title: 'What is the importance of recycling?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. Velit maxime neque est id nisi unde.`,
      },
      {
        title: 'What are the basic principles of photography?',
        text: `Distinctio blanditiis numquam. Officiis ducimus quia vitae dolore sit voluptas non et est. Id aut iure libero. Consequatur voluptatem ab.
Atque enim id. Id assumenda suscipit laudantium labore dignissimos ex ut libero. Incidunt hic debitis ut soluta esse.
Consequatur non ea laudantium fugit ut sed voluptate labore odio. Assumenda et earum ea sunt. <a href="https://google.com">Velit maxime neque est id nisi unde</a>`,
      },
    ];
  };
}

export const SupportApi = new SupportApiService('support');
