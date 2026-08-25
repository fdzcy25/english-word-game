# 单词勇者岛 V18.5 第三阶段

## 数据读取结构

教材:
data/books/*.json

流程:

教材 -> 年级 -> 册 -> Unit -> words[]

## 游戏共享词库

背词：
读取 Unit.words

小怪：
读取当前 Unit 未掌握词

跟读：
读取当前 Unit 单词

BOSS：
读取全册 words

## 进度

data/learning/learning_progress.json

记录:
- learnedWords
- wrongWords
- reviewQueue

## Unit显示

根据 words.length 动态显示:
例如:
38个单词 · 主线冒险

不再固定10词。

## 关卡切分

单次挑战:
10词

Unit总词量:
按教材实际数量。
