---
title: CPP用法
categories:
  - 笔试机考
abbrlink: 321f9cbf
date: 2024-08-07 16:06:03
---

## C++

### 实用知识

#### 输入输出

```c++
#include <iostream>
// 有时候当缓冲区中有残留数据时，cin函数会直接取得这些残留数据而不会请求键盘输入。
// cin >> 和 cin.getline()一起使用时，需要 cin.ignore(); 
// cin.get()和cin.getline()的区别：最大的区别就是get不会丢弃最后一个结束符,而getline()会丢弃结束符。

/** 
cin.get(字符数组名，接收长度，结束符)
其中结束符意味着遇到该符号结束字符串读取,默认为enter，读取的字符个数最多为（长度 - 1），因为最后一个为'\0'。要注意的是，cin.get(字符数组名，接收长度，结束符)操作遇到结束符停止读取，但并不会将结束符从缓冲区丢弃。
*/
// cin.getline(字符指针(char*), 字符个数N(int), 结束符(char))

#include <string>
// getline(istream &is, string &str, char delim)
```

#### 保留几位小数

```c++
double pi = 3.1415926;
printf("%.2lf", pi); // 保留两位

// 或者使用setprecision(n)
#include <iomanip>
double pi = 3.1415926;
cout << fixed << setprecision(2) << pi << endl;
```

#### 大小写互转

```cpp
#include <cctype>
char upper = toupper(ch); // 转换为大写
char lower = tolower(ch); // 转换为小写


#include <algorithm>
string str;
transform(str.begin(),str.end(),str.begin(),::tolower); // 转换为小写
transform(str.begin(),str.end(),str.begin(),::toupper); // 转换为大写
```

#### 库`<cctype>`

```cpp
#include <cctype>
using namespace std；

/** 
cctype头文件中的常用函数列表如下：

函数名称   返回值
isalnum()  如果参数是字母数字，即字母或者数字，函数返回true
isalpha()  如果参数是字母，函数返回true
iscntrl()  如果参数是控制字符，函数返回true
isdigit()  如果参数是数字（0－9），函数返回true
isgraph()  如果参数是除空格之外的打印字符，函数返回true
islower()  如果参数是小写字母，函数返回true
isprint()  如果参数是打印字符（包括空格），函数返回true
ispunct()  如果参数是标点符号，函数返回true
isspace()  如果参数是标准空白字符，如空格、换行符、水平或垂直制表符，函数返回true
isupper()  如果参数是大写字母，函数返回true
isxdigit() 如果参数是十六进制数字，即0－9、a－f、A－F，函数返回true

tolower()  如果参数是大写字符，返回其小写，否则返回该参数
toupper()  如果参数是小写字符，返回其大写，否则返回该参数
*/
```

#### set集合

- `set` 是一个有序的关联容器，其元素默认按照升序排列。你不能直接对 `set` 使用 `sort` 函数进行排序，因为 `sort` 函数适用于顺序容器（如 `vector`），并且需要迭代器作为参数。
- 如果你希望按照降序输出 `set` 的元素，可以使用 `std::greater<int>` 作为第三个参数调用 `std::set` 的构造函数来创建一个降序的 `set`。
- 使用 greater<int> 构造降序排序的 set。` set<int, greater<int>> sortedSet(mySet.begin(), mySet.end());`

```c++
#include <set>

set<int> set;
set.insert(1);
set.insert(2);
set.insert(3);
set.insert(1);
// set当中有3个元素

// find(value) 返回的是set值对应为value的迭代器；
auto it=set.find(2);
cout<< *it; //输出结果为2

// erase()有两种用法：删除某一元素、删除一个区间内的所有元素
set.erase(set.find(2)); // 删除元素2
it=set.find(2); // it指向的是2在集合中的地址
s.erase(s.begin(),it); // 删除从开始到2的元素（注意，这里不包括2）
// clear()是清空

// 遍历 只需要注意一点，end()指的是集合中最后一个元素地址的下一个地址。最后一个元素的地址是rbegin（）
std::set<int>::iterator iter;
for(iter = set.begin(); iter != set.end(); iter++){
    int tmp = *(iter);
    cout << tmp << endl;
}
```

#### sort()

- sort 函数是algorithm库下的一个函数，sort函数是不稳定的，即大小相同的元素在排序后相对顺序可能发生改变。如果某些场景需要保持相同元素间的相对顺序，可使用`stable_sort`函数
- 将`[first, last)`区间内元素升序排列。【注意区间为左闭右开】
- sort函数仅支持**可随机访问**的容器，如数组， string、vector、deque等。
- 实现**降序排列**，需传入第三个参数–比较函数，`greater<type>()`，这里的元素为`int` 类型，即函数为` greater<int>()`; 如果是其他基本数据类型如`float`、`double`、`long`等也是同理。
- `sort()`并非只是普通的快速排序，除了对普通的快速排序进行优化，它还结合了插入排序和堆排序。根据不同的数量级别以及不同情况，能自动选用合适的排序方法。

```c++
// 方式一、使用数组
int a[10] = {9, 6, 3, 8, 5, 2, 7, 4, 1, 0};
sort(a, a + 10);  // 10为元素个数

// 方式二、使用 vector
vector<int> arr = {9, 6, 3, 8, 5, 2, 7, 4, 1, 0};
sort(arr.begin(), arr.end());  // 10为元素个数
for (int i = 0; i < 10; i++) 
    cout << arr[i] << ' ';	// 输出排序后数组

// 可以使用自定义的比较函数，函数的返回值为bool类型
bool cmp(int num1, int num2) {
    return num1 > num2;     // 可以简单理解为 > 降序排列;  < 升序排列
}
int a[10] = {9, 6, 3, 8, 5, 2, 7, 4, 1, 0};
sort(a, a + 10, cmp);  // 使用自定义排序函数


// 结构体比较
struct Student {    // 学生结构体
    string name;    // 学生姓名
    int grade;      // 学生分数
    
    Student();  // 无参数构造函数
    Student(string name, int grade) : name(name), grade(grade) {};  // 有参数构造函数
};

bool cmp(Student s1, Student s2) {  // 自定义排序
    if (s1.grade != s2.grade) {     // 如果学生成绩不同
        return s1.grade > s2.grade; // 则按照成绩降序排列
    }
    return s1.name < s2.name;   // 否则按照姓名升序排列
}

sort(studs.begin(), studs.end(), cmp);  // 排序
for (int i = 0; i < studs.size(); i++) {    // 输出结果
	cout << studs[i].name << "\t" << studs[i].grade << endl;
}
return 0;
```

#### 字符串转化为整形

```c++
#include<string>

string s = "123";
cout << stoi(s) << endl;    //输出为 123。
cout << stoi("123") << endl;   //输出为 123。

// 整形转化为字符串
int a = 4;
string result = to_string(a);

// 注意有str.substr(size_t pos，size_t len);这样的函数
```

#### Vector

- 初始化

  ```cpp
    // 一维	
    int a[3] = { 1,2,3 };
    vector<int> v = {1,2,3,4};
    vector<int> v2(a, a+2); // {1, 2}
    vector<int> v3(v.begin()+1, v.end() - 1); // {2, 3}
    
    // 二维
    vector<vector<int>> v(3, vector<int>(4,0));
    vector<int> v0 = { 1,2,3,4 };
    vector<vector<int>> v1(4, v0);
    vector<vector<int>> v(v1.begin()+1, v1.end()-1); //此时的v是 {{1,2,3,4},{1,2,3,4}}
  ```

- `vector.emplace_back()` 优于 `vector.push_back()`

- `vector.back()` 获取最后一个元素。

### C++ 结构体

#### 创建结构步骤

- 定义struct结构

  ```c++
  /*关键字：struct*/
  struct Point{
      int x;
      int y;
      Point* father;
      
      // 构造函数，初始化节点的数据成员
      // 选择性地传递一个指向父节点的指针 father。
  	// 如果你没有显式地提供 father 参数，在构造对象时它将自动被初始化为 nullptr，这是 C++ 中处理默认参数的一种方式。
      Node(int x_, int y_, Point* father_ = nullptr)
          : x(x_), y(y_), father(father_) {}
  };
  ```

- 定义后创建变量，其中struct在c++中可以省略关键字struct，不会报错

  ```cpp
  Point p1;  // C++中，struct可省略
  struct Point p2; // c语言中
  ```

- **初始化**：使用由逗号分隔值列表，并将值用花括号括起来；

  ```cpp
  Point p1;
  p1 = {1, 2, 10};
  
  Point p2 = {3, 4, 11};
  Point p3 {5, 6, 12}; // 或者省略 =
  Point p4 {};  //大括号内不包含任何内容，各个成员都将设置为0，字符串string类型设置为空字符串 ""
  
  // 也能这样
  vector<Point> points;
  for(int i = 0; i < 3; i++)
     points.push_back({1, 1, 10});
  ```

- 使用成员运算符 `.` 来访问各个成员变量同时给变量进行赋值；

#### 结构体声明的位置

- **外部声明**
  - 将结构体的声明放在main()的前面，外部声明可以被后面任何函数使用
- **内部声明**
  - 将结构体的声明放在main()函数中，紧跟在开始括号的后面，内部声明只能被该声明所属的函数使用，通常应使用外部声明，便于所有函数都可以使用这种类型的结构；

#### 其他属性

- 可以将结构体**作为函数的参数传给函数**，同时**也可以将函数返回一个结构体**；
- 同时**可以使用赋值运算符** `=` 将结构体赋给另一个**同类型**的结构体（结构体中的每个成员都设置为另一个结构体中相应成员的值，称为成员赋值）

#### 汇总

```cpp
#include<iostream>
using namespace std;
#include<string>//使用字符串要添加的头文件，不然报错
//定义结构体：结构体属于用户自定义的数据类型，允许用户存储不同的数据类型
//三种方式：
//1、struct 结构体名 变量名
//2、struct 结构体名 变量名 = {member1,member2,...}
//3、定义结构体时顺便创建变量
 
struct Student
{
    //将string类作为成员
	string name;
	int age;
	int score;
 
}s3; //创建结构体时创建了一个默认的s3结构变量
 
int main()
{
	//1、struct Student s1
	//给变量赋值，使用结构体变量名加.进行赋值
	struct Student s1;
	s1.name = "张三";
	s1.age = 19;
	s1.score = 90;
	cout << "姓名：" << s1.name << " 年龄：" << s1.age << " 分数：" << s1.score << endl;
 
	//2、 struct Student s2 = {....}
	struct Student s2 = { "李四",20,80 };
	cout << "姓名：" << s2.name << " 年龄：" << s2.age << " 分数：" << s2.score << endl;
 
	//3、在创建结构体的时候就创建了一个s3结构体变量
	s3.name = "王五";
	s3.age = 23;
	s3.score = 100;
	cout << "姓名：" << s3.name << " 年龄：" << s3.age << " 分数：" << s3.score << endl;
 
	system("pause");
	return 0;
}
```

### C++ 类

#### C++中struct和class的区别是什么

- C++需要兼容C语言，所以C++中struct可以当成结构体使用。
- C++中struct还可以用来定义类。和class定义类是一样的，
- **struct**定义的类默认访问权限是**public**，**class**定义的类默认访问权限是**private**。

#### 定义

声明和定义全部放在类体中，需注意：成员函数如果在类中定义，编译器可能会将其当成内联函数处理

```cpp
//声明和定义全部放在类体中
class Person{
public:
    Person(){ // 无参构造函数
    // todo
    } 
    Person(char* name, char* sex, int age){ // 带参构造函数
    // todo
    }
    void showinfo(){
        cout << "_name" << "_sex" << "_age" << endl;
    }
    ~Person(){
      // todo
    }
private:
    char *_name;
    char *_sex;
    int _age;
}
```

类声明放在.h文件中，成员函数定义放在.cpp文件中，注意：成员函数名前需要加类名 `::`

```cpp
//声明放在类的头文件person.h中
class Person{
public:
    void showinfo();
private:
    char *_name;
    char *_sex;
    int _age;
}

//定义放在类的实现文件person.cpp中
void Person::showinfo(){
    cout << "name:" << _name << endl;
}
```

#### 类的实例化

##### 实例化

**用类类型创建对象的过程，称为类的实例化**

- 类是对对象进行描述的，是一个模型一样的东西，限定了类有哪些成员，定义出一个类并没有分配实际的内存空间来存储它
- 一个类可以实例化出多个对象，**实例化出的对象 占用实际的物理空间**
- `Person p;` 和 `Person p = Person();`都会调用**无参构造函数**
  - 前者直接声明并定义一个 Person 类的对象 person。根据情况，编译器会调用 Person 类的默认构造函数来初始化 person 对象。
  - 后者使用了复制初始化的方式来创建对象 person。右侧的 Person() 是一个临时对象，通过调用 Person 类的默认构造函数来创建。然后，使用复制初始化的语法将这个临时对象复制到 person 对象中。
- `Person p(name, sex, age);` 和 `Person p = Person(name, sex, age);` 都会调用**有参构造函数**

#### `this`指针

- C++编译器给每个“**非静态的成员函数**“增加了一个**隐藏的指针参数**，让该指针指向当前对象(函数运行时调用该函数的对象)，在函数体中所有“成员变量”的操作，都是通过该指针去访问。只不过所有的操作对用户是透明的，即用户不需要来传递，**编译器自动完成**
- `this`指针特性：**this指针是形参，存在于栈桢中**
  - this指针的类型：类类型* const，即成员函数中，不能给this指针赋值，不能修改this指针。
  - 只能在“成员函数”的内部使用
  - this指针本质上是“成员函数”的形参，当对象调用成员函数时，将对象地址作为实参传递给this形参。所以对象中不存储this指针。
  - this指针是“成员函数”第一个隐含的指针形参，一般情况由编译器通过ecx寄存器自动传递，不需要用户传递

> 不能显示写this相关的实参和形参，但是可以在类中显式使用

##### 经典例子

```cpp
class A{
public:
    void Print()
    {
      cout << "Print()" << endl;
    }
private:
    int _a;
};
int main(){
    A* p = nullptr;
    p->Print();
    return 0;
}
```

如上例子，我们发现是可以**正常运行**的。
有人可能会说，这是空指针解引用，运行时报错。
p虽然是空指针，但是**Print函数地址不存在对象中**，这就**不是空指针的解引用**。
<br>

再看看这个例子

```cpp
class A{
public:
    void PrintA()
    {
      cout << _a << endl;
    }
private:
	  int _a;
};
int main()
{
    A* p = nullptr;
    p->PrintA();
    return 0;
}
```

能通过编译，但是会在**运行时报错**。
`cout << this->_a << endl;` 这句代码就变成了**空指针的解引用操作**了。`_a`是存在于对象中的。

### C++ 字符串string

#### 初始化

- `string s1;` 默认初始化，是一个空串`""`。 
- `string s1(s2)` `string s1 = s2` s1 是 s2 的副本。
- `string s3("value")` `string s3 = "value"` s3 是字面值 "value" 的副本
- `string s4(n, 'c')` 把 s4 初始化为 n 个 字符 c 组成的串。

#### 比较大小

```cpp
// 尽管两者的前面对应的字符都一样，但是phrase长度长（多一个空格），所以phrase>str。
string str = "Hello";
string phrase = "Hello ";
// thrase > str;

//这种情况比较的是第一个相异字符，根据ascii码比较，，因为 e < i，所以 str2 < phrase2。
string str2 = "Hello";
string phrase2 = "Hi ";
// str2 < phrase2
```

#### 获取和处理string中的每个字符

- 使用下标运算符 `[]`

- 使用迭代器

  ```cpp
  string s = "Hello world!";
  for (auto it = s.begin(); it != s.end(); it++){ // std::string::iterator it;
    cout << *it << ",";
  }
  cout << endl;
  ```

- 基于范围的 for

  ```cpp
  string str("some string");
  for (auto c : str)
    cout << c << ",";
  cout << endl;
  ```

##### `substr` 成员函数

- std::string 类型的对象调用 substr 方法并**不会修改其自身内容**。相反，substr 方法会**返回一个新的 std::string 对象**，该对象包含了从原始字符串中指定位置开始的指定长度的子串。

```cpp
string s ("value");

string s2 = s.substr();//s2为”value”,大小为5

string s3 = s.substr(2);//s3为”lue”,大小为3
string s4 = s.substr(5);//s3为””,大小为0
string s5 = s.substr(6);//错误，s5的大小为pos = 5，小于s.size()

string s6 = s.substr(1,2);// s6为”al”,大小为2
string s7 = s.substr(1,7);// s7为”alue”,大小为4
string s8 = s.substr(5,7);// s8为””,大小为0
string s9 = s.substr(6,7);// 错误，s9的大小为pos = 5，小于s.size()
```

##### append() 追加方法

- 在字符串的末尾**添加字符串str**

  - `string& append (const string& str);`
  - `string& append (const char* s);`
  - 这种情况实际上就相当于 `+=`

- 在字符串的末尾添加字符串str的子串，子串以subpos索引开始，长度为sublen

  - `string& append (const string& str, size_t subpos, size_t sublen);`

    ```cpp
    string s1 = "hello";
    string s2 = "the world";
    s1.append(s2,4,5);  //把字符串从s2中从4开始的5个字符连接到当前字符串的结尾
    // 运行结果为：s1 = "helloworld";
    ```

  - 若是添加的子串中只有索引开始的位置，没有长度，则表示字符串从**第n个字符到末尾的字符连接到当前字符串末尾**【注意和char* 类型的区别！】，如下：

    ```cpp
    string s1 = "hello";
    string s2 = "the world";
    s1.append(s2, 3);
    // 运行结果为：s1 ="hello world"
    
    ```

- 在字符串的末尾添加字符串s中的前n个字符。

  - `string& append (const char* s, size_t n)`

  - 在string的后面添加C-string的一部分。把c类型字符串c的前n个字符连接到当前字符串结尾，如下：

    ```cpp
    string s = "hello";
    const char*c = "the world";
    s.append(c,3);
    // 运行结果为：s = "hellothe";
    ```

- 在字符串的末尾**添加n个字符c**;

  - string& append (size_t n, char c);

    ```cpp
    string s1 = "hello";
    s1.append(3, '!'); //在当前字符串结尾添加3个字符!
    // 运行结果为 s1 = "hello!!!";
    ```

- 在字符串的末尾添加以迭代器first和last表示的字符序列。

  - `string& append (InputIterator first, InputIterator last););
    `

##### insert() 插入方法

- `iterator insert(iterator pos, CharT ch)` 迭代器insert

  - 顺序容器通用的迭代器版本

    ```cpp
    string s1("value");
    s1.insert(s1.begin()++, 's'); //执行后，s1为"svalue"
    s1.insert(s1.begin(), 's');   //执行后，s1为"vsalue"
    ```

- `basic_string& insert(size_type index, size_type count, CharT ch)` 下标insert

  - 在下标index前插入count个字符ch

    ```cpp
    string s1("value");
    s1.insert(3, 2, 's'); //执行后，s1为"valssue"
    s1.insert(5, 2, 's'); //执行后，s1为"valuess"
    ```

- `basic_string& insert( size_type index, const CharT* s );`

- `basic_string& insert( size_type index, const basic_string& str );`

  - 在下标index前插入一个常量字符串或者string对象。

    ```cpp
    string s1("value");
    string s3 = "value";
    const char* cp = "value";
    
    s1.insert(0,s3); //执行完后，s1为"valuevalue"
    s1.insert(0,cp); //执行完后，s1为"valuevalue"
    ```

##### erase() 删除方法

三种形式

- `basic_string & erase(size_type pos=0, size_type n=npos)`

  - 如果string对象s调用，它**删除s从pos下标开始的n个字符**，并返回删除后的s。当`pos > s.size()`时，报错

- `iterator erase(const_iterator position)`

  - 如果string对象s调用，它删除s**迭代器position位置**的字符，并返回下一个字符的迭代器。

- `iterator erase(const_iterator position)`

  - 如果string对象s调用，它删除s**迭代器[first,last)区间**的字符，并返回last字符的迭代器。

  ```cpp
  string s1("value");
  string s2("value");
  string s3("value");
  string s4("value");
  
  s1.erase();            //执行后，s1为空
  s2.erase(0,2);         //执行后，s2为"lue"
  s3.erase(s3.begin());  //执行后，s3为"alue"
  s4.erase(s4.begin(),++s4.begin());//执行后，s4为"alue"
  ```

##### replace() 替换方法

- replace可看作是erase和insert的结合体，它删除指定的字符，删除后再插入指定的字符。
- 和insert一样，可以通过下标或者是迭代器指定位置。

```cpp
string s("i very love China!");
string str1 = "really";

// 将s从下标2开始删除5个字符，删除后在下标2插入str1
s.replace(2, 5, str1); // s="i really love China!"
// 将s从下标2开始删除6个字符，删除后在下标2插入str2从下标0开始的6个字符
s.replace(2, 6, str2, 0, 6); // s=""i really love China!"
// 将s从下标2开始删除6个字符，删除后在下标2插入4个’*’字符
s.replace(2, 6, 4, '*'); // s="i **** love China!"
```

##### 搜索操作

**函数形式**

| string搜索函数            | 描述                                              |
| ------------------------- | ------------------------------------------------- |
| s.find(args)              | 在s中查找第一次出现args的下标                     |
| s.rfind(args)             | 在s中查找最后一次出现args的下标                   |
| s.find_first_of(args)     | 在s中查找第一个在args中出现的字符，返回其下标     |
| s.find_first_not_of(args) | 在s中查找第一个不在args中出现的字符，返回其下标   |
| s.find_last_of(args)      | 在s中查找最后一个在args中出现的字符，返回其下标   |
| s.find_last_not_of(args)  | 在s中查找最后一个不在args中出现的字符，返回其下标 |

**args参数格式**

| args参数格式 | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| c,pos        | 搜索单个字符。从s中位置pos开始查找字符c。pos可省略，默认值为0 |
| s2,pos       | 搜索字符串。从s中位置pos开始查找字符串string对象s2。pos可省略，默认值为0 |
| cp,pos       | 搜索字符串。从s中位置pos开始查找指针cp指向的以空字符结尾的C风格字符串。pos可省略，默认值为0 |
| cp,pos,n     | 从s中位置pos开始查找指针cp指向的数组的前n个字符。            |


- 注意：`std::string::npos`是string类中定义的一个`std::size_t`类型变量，值为`std::size_t`类型的**最大值**。

```cpp
std::string str("There are two needles in this haystack with needles.");
std::string str2("needle");
// 对应参数 args为 (s2, po)
std::size_t found = str.find(str2); //返回第一个"needles" n的下标
if (found != std::string::npos)
	std::cout << "first 'needle' found at: " << found << '\n'; // 14


// 把str中的所有元音字母aeiou换成*。
std::string str("Please, replace the vowels in this sentence by asterisks.");
std::size_t found = str.find_first_of("aeiou");
while (found != std::string::npos)
{
	str[found] = '*';
	found = str.find_first_of("aeiou", found + 1);
}

std::cout << str << '\n';
```

##### compare操作

- 若 s = 指定的字符串，s.compare()返回 0
- 若 s > 指定的字符串，s.compare()返回正数
- 若 s < 指定的字符串，s.compare()返回负数

```cpp
string str1("green apple");
string str2("red apple");

// str1和str2比较：参数形式1
int res = str1.compare(str2); // str1 < str2，res < 0;
```

### C++ 查找方法

- **只能用于查找序列容器**：用于在序列容器（如 `std::vector`, `std::list`, `std::array` 等）中**线性查找**指定元素。

#### `std::find()` 查找方法

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 查找值为 3 的元素
    auto it = std::find(vec.begin(), vec.end(), 3);

    if (it != vec.end()) {
        std::cout << "Element found at index: " << std::distance(vec.begin(), it) << std::endl;
    } else {
        std::cout << "Element not found" << std::endl;
    }

    return 0;
}
```

#### `std::find_if()` 自定义查找条件

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

bool isEven(int num) {
    return num % 2 == 0;
}

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 查找偶数元素
    auto it = std::find_if(vec.begin(), vec.end(), isEven);

    if (it != vec.end()) {
        std::cout << "First even element found at index: " << std::distance(vec.begin(), it) << std::endl;
    } else {
        std::cout << "No even element found" << std::endl;
    }

    return 0;
}
```

#### `std::count()` 统计元素个数

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5, 2, 2};

    // 统计值为 2 的元素个数
    int count = std::count(vec.begin(), vec.end(), 2);

    std::cout << "Number of 2s in vector: " << count << std::endl;

    return 0;
}
```


### C++ 手搓split()方法

- 以字符进行分割：

  ```cpp
  vector<string> Split(const string &s, const char &separator) {
      vector<string> ans;
      string tmp = "";
      for (int i = 0; i < s.size(); i++) {
          if (s[i] != separator) {
              tmp += s[i];
          }else {
              if(tmp != ""){
                  ans.push_back(tmp);
                  tmp = "";
              }  
          }
      }
      if(tmp != "")
          ans.push_back(tmp);
      return ans;
  }
  ```

- 以字符串进行分割：

  ```cpp
  vector<string> Split(const string &s, const string &separator) {
    vector<string> ans;
    string token, str = s;
    size_t pos = 0;
    while((pos = str.find(separator)) != string::npos) {
  	  token = str.substr(0, pos);
          if(token != "")
  	      ans.push_back(token);
  	  str.erase(0, pos + separator.length());
    }
      if(str != "")
        ans.push_back(str);
    return ans;
  }
  ```


### advance() 方法的使用

- advance() 函数用于**将迭代器**前进（或者后退）**指定长度的距离**。
- `void advance (InputIterator& it, Distance n);`
- **注意**：
  - advance() 函数本身不会检测 it 迭代器移动 n 个位置的可行性，如果 it 迭代器的移动位置超出了合理范围，it 迭代器的指向将无法保证，此时使用 *it 将会导致程序崩溃。

#### 其成员函数

| 迭代器辅助函数        | 功能                                                         |
| --------------------- | ------------------------------------------------------------ |
| advance(it, n)        | it 表示某个迭代器，n 为整数。该函数的功能是将 it 迭代器前进或后退 n 个位置。 |
| distance(first, last) | first 和 last 都是迭代器，该函数的功能是计算 first 和 last 之间的距离。 |
| begin(cont)           | cont 表示某个容器，该函数可以返回一个指向 cont 容器中第一个元素的迭代器。 |
| end(cont)             | cont 表示某个容器，该函数可以返回一个指向 cont 容器中最后一个元素之后位置的迭代器。 |
| prev(it)              | it 为指定的迭代器，该函数默认可以返回一个指向上一个位置处的迭代器。注意，it 至少为双向迭代器。 |
| next(it)              | it 为指定的迭代器，该函数默认可以返回一个指向下一个位置处的迭代器。注意，it 最少为前向迭代器。 |

#### 示例

```cpp
#include <iostream>     // std::cout
#include <iterator>     // std::advance
#include <vector>
using namespace std;
 
vector<int> vec{ 1,2,3,4 };

vector<int>::iterator it = vec.begin();
advance(it, 2); // 输出 1、*it = 3
cout << "1、*it = " << *it << endl;

it = vec.end();
advance(it, -3);
cout << "2、*it = " << *it; // 输出 2、*it = 2
```
