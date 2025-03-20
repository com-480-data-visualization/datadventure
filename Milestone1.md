# Milestone 1 

## Problematic


## Datasetsand Exploratory Data Analysis

### [Mental disorders and music features](https://www.kaggle.com/datasets/chlobon/mental-disorders-and-music-features/data)

The mental disorder and music features dataset contains 649.244 rows. We then proceed to observe the data and find that some songs are the same but with Remastered or the year in the name, so we eliminate the suffixes to make them the same. We then proceeded to eliminate all the rows which had missing data(around a 10000), and were left with 526680 rows. We checked for duplicate rows but found none .We finally dropped columns that were relied on for formatting, and would be useless for our analysis. After this we were left with 526680 clean rows corresponding to a user, a song title, music characteristics  and the mental disorder of the user.

### [Music & Mental Health Survey Results](https://www.kaggle.com/datasets/catherinerasgaitis/mxmh-survey-results)

The Music & Mental Health Survey Results dataset consists of data about individuals' music taste and their self-reported mental health. It consists of 736 rows and 33 columns, where one row represents one person, and the columns are features related to their music taste and behaviour, as well as their self reported mental health. After removing all rows with missing data and the columns timestamp and permission, we were left with 616 rows and 31 columns.

 When exploring the dataset Music & Mental Health Survey Results we found that some genres (like pop, rap, and rock) are more frequently listened to, while others (such as gospel or country) have higher counts of “never” or “rarely”. Listeners with rock  or metal as their favourite genre seems overrepresented in the dataset. Most people use Spotify to stream.

 ![Distribution Streaming and Fav Genre](images/music_and_mental_health_dataset/distribution_streaming_and_fav_genre_mxmh.png)

 When examining mental health by favorite genre, we see that no single genre consistently reports exclusively high or low scores. This indicates that mental health experiences vary significantly within each listener group. 
 ![Box Plot Genre and Mental Health](images/music_and_mental_health_dataset/box_plot_genre_mental_health_mxmh.png)
 
 The correlation matrix confirms that the strongest correlations occur among the different self-reported mental health measures themselves and among the frequencies of listening to various genres, rather than between mental health and specific genre preferences.
 ![Correlation Matrix - Music and Mental Health](images/music_and_mental_health_dataset/correlation_matrix_mxmh.png)

### [Student Depression Dataset](https://www.kaggle.com/datasets/hopesb/student-depression-dataset?resource=download)

This dataset contains demographic statistics as well as mental health indicators and a depression diagnosis for about 28 thousand university students and 18 people with a profession other than “student”. The mean age of the dataset is about 25. 

### [Student Stress Factors: A Comprehensive Analysis](https://www.kaggle.com/datasets/rxnach/student-stress-factors-a-comprehensive-analysis/data)

This dataset contains 1100 rows where each row corresponds to a student survey reply with data with mental health indicators and lifestyle attributes in each column. The dataset requires very little preprocessing as it contains no null values as well as no duplicates. The values are straightforward as well, as they are mostly numerical, so anything besides normalizing is probably superfluous

![Features ](images/student_depression_dataset/Features.png)

We see, that the dataset has a lot of interesting features, which will (hopefully) help us find correlations between lifestyle and depression.

![Features described](images/student_depression_dataset/Features_described.png)

![Features boxplot](images/student_depression_dataset/Features_boxplot.png)

![Features correlation matrix](images/student_depression_dataset/Features_correlation_matrix.png)

After running a linear regression on the normalized data, we see that we in fact have features with a greater weight than other, such as financial stress, and some features with negative weight, like age.

![alt text](images/Features_linreg_weight.png)

### Exploratory Data Analysis



### Related work



