import {HyperValue} from 'hyper-value';
import {jsx, Component} from 'hv-jsx';
import {renderIn} from 'hv-dom';

// fake data:
const data = [
    {id: 0, text: 'Hello world'},
    {id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
    {id: 2, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'},
    {id: 3, text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'},
    {id: 4, text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
]

// fake fetch:
let fecthId = 0;

function fakeFecth(query: string): Promise<typeof data> {
    const id = fecthId++;
    console.log(`fetch #${id} started...`);

    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`fetch #${id} resolved`);
            resolve(data.filter(item => item.text.toLowerCase().includes(query.toLowerCase())));
        }, Math.round(Math.random() * 2000 + 500));

    });
}

class App extends Component<{}> {
    query = new HyperValue('');

    // it's basically all of the search logic
    results = this.hs.async({get: w => {
        return w(fakeFecth(this.query.$));
    }});

    render() {
        return <div>
            <input type='text' value={this.query} placeholder='Search...' />
            <br />
            <div class='results'>
                {
                    this.hs.auto(() => {

                        // show loader if data is being loaded
                        // resluts.state - is a hyper-value of the promise state
                        if (this.results.state.$ === 'pending') {
                            return <div class='centred'>
                                <span class='loading'/>
                            </div>;
                        }

                        // if no result - output it
                        if (!this.results.$ || this.results.$.length === 0) {
                            return <div class='centred'>
                                no results
                            </div>;
                        }

                        // output results
                        return <ul>{
                            this.results.$.map(item => {
                                return <li>#{item.id}: {item.text}</li>;
                            })
                        }</ul>
                    })
                }
            </div>
        </div>;
    }
}

renderIn(document.body, {}, <App />);
