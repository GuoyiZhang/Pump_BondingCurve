# DeFi 计算器集合

一个基于纯前端网页的 DeFi 计算器 + Bonding Curve 分析 + AI Agent 商业布局分享站点集合。
所有页面均为原生 HTML / CSS / JavaScript 实现，无需后端服务器，直接用浏览器打开即可运行。

## 站点结构

站点分为两个部分：

1. **根目录 · DeFi 计算器集合**：Uniswap V2 价格计算器与多个 Bonding Curve 分析页面。
   - 入口：`index.html`
2. **`ai-agent/` 子站 · AI Agent 策略广场**：独立的产品落地页，介绍「创作者发布策略、AI Agent 自动执行」的产品形态。
   - 入口：`ai-agent/index.html`
3. **`ai-agent.html` 单页演讲稿**：AI Agent 市场机会与商业布局的章节式分享页（与 `ai-agent/` 子站互为补充，前者偏战略演讲、后者偏产品落地）。

## 功能概述

### A. DeFi 计算器（根目录）

1. **Uniswap 价格计算器** (`uniswap.html`)
   - 支持 USDT 和 ETH 作为基础货币
   - 实时价格获取（依赖 Binance API）
   - 详细的交易预览、滑点计算与流动性分析

2. **Bonding Curve 分析系列**

   | 文件 | 计价币 | 发行量 | 初始池 | 采样粒度 | 说明 |
   |------|--------|--------|--------|----------|------|
   | `bondingEth-TITI.html` | X | 10 亿 | 6000U（虚拟池 30,000 X） | — | Bonding V1，含 X 价值(U) 与 0.2 倍市值口径 |
   | `bondingEth.html`      | ETH | 10 亿 | 6000U（虚拟池 2 ETH） | — | Bonding V2，ETH 计价版本 |
   | `bondingEth2.html`     | X | 1 亿  | 5000U（虚拟池 25,000 X） | 5,000 步长 | 粗粒度采样，含 X 价值(U) 与 0.2 倍市值口径 |
   | `bondingEth3.html`     | X | 1 亿  | 5000U（虚拟池 25,000 X） | 1,000 步长 | 细粒度采样，初始价格 0.000238 X |
   | `bonding.html`         | SOL | 10 亿 | 30 SOL（PUMP.FUN） | — | PUMP.FUN 联合曲线分析 |

   > `bondingEth2` 与 `bondingEth3` 标题与初始参数完全相同，差异仅在采样步长（5000 vs 1000）与表格列结构，分别用于粗/细两种粒度的可视化对比。

### B. AI Agent 系列页面

1. **`ai-agent.html`**（根目录单页演讲稿）
   - 五大章节的章节式滚动分享页：什么是 AI Agent → Agent 能力地图 → 商业赛道全景 → 落地路径与风险 → 总结与行动
   - 内含 11 个产品矩阵、三层商业布局（平台/垂直/工具）、飞轮效应与单元经济模型分析

2. **`ai-agent/` 子站**（独立产品落地页）
   - `index.html`：首页 · 创作者发布策略 / Agent 自动执行
   - `features.html`：功能 · 3 种创建模式 + 5 类 Agent + 3 层风控
   - `creators.html`：创作者中心 · 85% 订阅费分成
   - `pricing.html`：定价 · 普通用户按月订阅 + 创作者分成
   - `docs.html`：技术文档 · 架构 / 5 类 Agent / 策略 YAML / BinanceRouter / MCP Server
   - `styles.css` / `script.js`：子站样式与交互脚本

## 技术实现

### 前端技术栈
- 纯原生 HTML / CSS / JavaScript，无任何框架
- `Chart.js 3.7.0`（CDN）用于 Bonding Curve 系列的价格/数量曲线展示
- 响应式设计，支持移动端访问
- AI Agent 子站使用独立的 `styles.css` + `script.js`，与根目录页面样式相互独立

### 核心算法

#### Uniswap 计算器
- 恒定乘积公式：`k = token数量 × 基础货币数量`
- 价格计算：`price = 基础货币数量 / token数量`
- 滑点计算：`slippage = (实际成交价 - 当前价格) / 当前价格 × 100%`
- 流动性计算：`liquidity = 基础货币数量 × 2`

#### Bonding Curve 计算器
- 代币发行量：`y(x) = initialY - k / (initialX + x)`
- 价格计算：`price(x) = (initialX + x)^2 / k`
- 市值计算：`marketCap = totalSupply × price`
- 边界约束：`y(0) = 0`，即 `initialY = k / initialX`（保证初始状态无代币流出）

> 各 Bonding 文件中均含一段推导注释，说明「初始价格与最终代币数量由参数紧密关联，无法同时独立调整」的约束关系。

## 文件结构

```
.
├── index.html                # 根目录入口 · DeFi 计算器导航
├── uniswap.html              # Uniswap V2 价格计算器
├── bondingEth-TITI.html      # Bonding V1 · X 计价 · 10亿/6000U
├── bondingEth.html           # Bonding V2 · ETH 计价 · 10亿/6000U
├── bondingEth2.html          # Bonding · X 计价 · 1亿/5000U · 粗粒度(5000步)
├── bondingEth3.html          # Bonding · X 计价 · 1亿/5000U · 细粒度(1000步)
├── bonding.html              # PUMP.FUN Bonding · SOL 计价 · 30 SOL
├── ai-agent.html             # AI Agent 商业布局 · 章节式分享页
├── ai-agent/                 # AI Agent 策略广场子站
│   ├── index.html            # 首页
│   ├── features.html         # 功能
│   ├── creators.html         # 创作者中心
│   ├── pricing.html          # 定价
│   ├── docs.html             # 技术文档
│   ├── styles.css            # 子站样式
│   └── script.js             # 子站脚本
├── README.md
├── .gitattributes
└── .gitignore
```

## 使用说明

### Uniswap 计算器
1. 选择基础货币 (USDT/ETH)
2. 输入池子中的基础货币和代币数量
3. 输入交易数量
4. 选择交易类型 (买入/卖出)
5. 查看详细的交易预览和影响分析

### Bonding Curve 计算器
1. 查看初始参数设置（虚拟池初始币种、初始 k 值、初始代币价格）
2. 在表格中查看不同投入量对应的代币获得量、价格与市值
3. 通过图表直观了解价格与代币数量的变化趋势
4. 注意各文件参数口径不同（计价币、发行量、初始池、采样粒度均可能不同）

### AI Agent 子站
1. 从 `ai-agent/index.html` 进入
2. 顶部导航在 首页 / 功能 / 创作者 / 定价 / 文档 之间切换
3. `ai-agent.html` 为独立的商业布局分享页，可直接打开单页浏览

## 本地开发

项目纯前端，无需构建。任选其一即可本地预览：

### 方式一：直接打开
直接双击 `index.html` 在浏览器中打开即可。
> 注意：Uniswap 计算器的实时 ETH 价格依赖 Binance API，需在可访问外网的环境下打开。

### 方式二：起一个静态服务器（推荐）
```bash
# Python 3
python3 -m http.server 8000

# 或 Node
npx serve .
```
然后浏览器访问 `http://localhost:8000/`（根目录入口）或 `http://localhost:8000/ai-agent/`（子站入口）。

## 注意事项

1. 所有计算均基于理想情况，实际交易会有所偏差，仅供参考，不构成投资建议
2. Uniswap 计算器的 ETH 实时价格功能依赖 Binance API，离线时无法获取
3. 大额交易建议分批进行以减少滑点影响
4. Bonding Curve 系列各文件参数口径不同，横向对比前请先核对初始参数

## 代码维护建议

- 保持算法计算的准确性，Bonding 公式改动时同步更新推导注释
- 定期检查 Binance API 可用性
- 确保响应式设计在不同尺寸下的兼容性
- `ai-agent/` 子站的样式与根目录页面相互独立，修改时请勿交叉引用
