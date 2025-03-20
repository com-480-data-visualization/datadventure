# Milestone 1 

## Problematic

It’s no secret that music can have profound impacts on a person’s mood and feelings. Music is frequently used in situations where a good mood is desired, like in bars, while dancing, while studying. And the inverse is true. What is a sad breakup without some music to accompany the process of getting over someone? This observation prompts us to ask the question, how are music and mental health correlated? Can you guess a person's self reported mental health if you know their music habits?

We want to  “visualize the invisible”. Having a look at the datasets however revealed, that the invisible is invisible in the datasets as well. Thus, instead of provig the connection between music and mental health, we want to challenge the assumption that one exists. 

Our interactive visualization will invite users to guess a persona’s mental health based on their music preferences. By showing how difficult it is to make accurate guesses, we aim to highlight the limitations of this assumptions. Following this, we will present data-driven visualizations of other factors that have been shown to correlate with mental health, encouraging users to rethink how well-being can (and cannot) be inferred from daily habits like music consumption.


## Datasetsand Exploratory Data Analysis

### [Mental disorders and music features](https://www.kaggle.com/datasets/chlobon/mental-disorders-and-music-features/data)

The mental disorder and music features dataset contains 649.244 rows. We then proceed to observe the data and find that some songs are the same but with Remastered or the year in the name, so we eliminate the suffixes to make them the same. We then proceeded to eliminate all the rows which had missing data(around a 10000), and were left with 526680 rows. We checked for duplicate rows but found none .We finally dropped columns that were relied on for formatting, and would be useless for our analysis. After this we were left with 526680 clean rows corresponding to a user, a song title, music characteristics  and the mental disorder of the user.

### [Music & Mental Health Survey Results](https://www.kaggle.com/datasets/catherinerasgaitis/mxmh-survey-results)

The Music & Mental Health Survey Results dataset consists of data about individuals' music taste and their self-reported mental health. It consists of 736 rows and 33 columns, where one row represents one person, and the columns are features related to their music taste and behaviour, as well as their self reported mental health. After removing all rows with missing data, we were left with 616 rows. We dropped the timestamp and permission columns as we don’t need this data. We end up with a dataset which consists of 616 rows and 31 columns.

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

Our datasets have been used in quite a few other data analysis projects online [1] [2] [3], however most of them don’t go further than simple presentations of statistics, and they generally don’t tell a thought-provoking story. By not focussing on a rigorous scientific exploration of the data, but rather visualizing correlations in a fun and artistic way, we hope to make the abstract link between music and feelings more graspable. We aim for a data story which evokes emotions and thought, similar to audible and tactile installations in museums, like Esther Shalev-Gerz’s White Out – Between Telling and Listening, which can be found in Lausanne’s Cantonal Museum of Fine Arts (MCBA) [2]


[1]:  https://www.kaggle.com/datasets/catherinerasgaitis/mxmh-survey-results/code

[2]: https://www.kaggle.com/datasets/hopesb/student-depression-dataset/code

[3]: https://www.kaggle.com/datasets/rxnach/student-stress-factors-a-comprehensive-analysis/code

[4]: https://www.mcba.ch/en/collection/white-out-between-telling-and-listening-2/



