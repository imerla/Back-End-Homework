const { Command } = require('commander');
const fs = require('fs').promises;

async function readPhoneData() {
  try {
    const data = await fs.readFile('phones.json', 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writePhoneData(data) {
  await fs.writeFile('phones.json', JSON.stringify(data, null, 2));
}

const program = new Command();

program
  .name('phone-cli')
  .description('CLI tool to manage phone numbers')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new phone number')
  .argument('<name>', 'Person name')
  .argument('<phone>', 'Phone number')
  .option('--america', 'Add 011 prefix for America')
  .action(async (name, phone, options) => {
    const phones = await readPhoneData();
    const newPhone = options.america ? `011${phone}` : phone;
    const newEntry = {
      id: phones.length + 1,
      name: name,
      phone: newPhone
    };
    phones.push(newEntry);
    await writePhoneData(phones);
    console.log(`Added: ${name} - ${newPhone}`);
  });

program
  .command('delete')
  .description('Delete a phone number by ID')
  .argument('<id>', 'ID to delete')
  .action(async (id) => {
    const phones = await readPhoneData();
    const index = phones.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      const deleted = phones.splice(index, 1)[0];
      await writePhoneData(phones);
      console.log(`Deleted: ${deleted.name} - ${deleted.phone}`);
    } else {
      console.log(`ID ${id} not found`);
    }
  });

program
  .command('get')
  .description('Get a phone number by ID')
  .argument('<id>', 'ID to get')
  .action(async (id) => {
    const phones = await readPhoneData();
    const phone = phones.find(p => p.id === parseInt(id));
    if (phone) {
      console.log(`Found: ${phone.name} - ${phone.phone}`);
    } else {
      console.log(`ID ${id} not found`);
    }
  });

program
  .command('list')
  .description('List all phone numbers')
  .action(async () => {
    const phones = await readPhoneData();
    console.log('Phone List:');
    phones.forEach(p => {
      console.log(`${p.id}: ${p.name} - ${p.phone}`);
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
