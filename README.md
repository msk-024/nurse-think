## データベース構造 (ER図)

erDiagram

    USERS ||--o{ RESULTS : "1:N (ログインユーザーの履歴)"

    CASES ||--o{ RESULTS : "1:N"

    REVIEWERS ||--o{ RESULTS : "1:N (担当レビュアー)"

    RESULTS ||--|| REVIEWER_FEEDBACKS : "1:1 (評価内容)"



    USERS {

        uuid id PK "ユーザー固有ID"

        string email "メールアドレス(unique)"

        timestamp created_at "作成日"

        timestamp updated_at "更新日"

    }



    CASES {

        int id PK "症例ID"

        enum status "draft / published (下書き/公開)"

        enum mode "clinical / occupational (臨床/産業)"

        int level "難易度(1-3)"

        string title "タイトル"

        text situation "公開情報"

        text hidden_answer "非公開(AI採点用の模範解答)"

        text after_story "非公開(産業用:後日談)"

        text commentary "非公開(医学的解説)"

        timestamp created_at "作成日"

        timestamp updated_at "更新日"

        timestamp deleted_at "削除日時(論理削除)"

    }



    REVIEWERS {

        int id PK "レビュアーID"

        string name "名前(ユウタ先輩/江角/鬼塚先生)"

        string image_url "キャラクター画像URL"

        text role_instruction "AIへの性格・役割指示文"

        timestamp created_at "作成日"

    }



    RESULTS {

        int id PK "履歴ID"

        uuid user_id FK "USERS.id (NULL許容)"

        int case_id FK "CASES.id"

        int reviewer_id FK "REVIEWERS.id"

        text user_answer "ユーザーの回答(300字)"

        text ai_evaluation "AIが生成した評価・アドバイス全文"

        int score "スコア(CHECK 0-100)"

        timestamp created_at "回答日時"

    }



    REVIEWER_FEEDBACKS {

        int id PK "ID"

        int result_id FK "RESULTS.id (1対1紐付け)"

        enum evaluation_level "excellent / good / check"

        text feedback_text "レビュアーからの評価メッセージ"

    }